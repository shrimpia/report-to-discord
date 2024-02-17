import { ReportApiParam } from './report-api-param';

export const postToDiscord = async (webhook: string, misskeyUrl: string, data: ReportApiParam) => {
  const [reportee, reporter] = await Promise.all([
    fetch(`${misskeyUrl}/api/users/show`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: data.userId,
      }),
    }),
    fetch(`${misskeyUrl}/api/i`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        i: data.i,
      }),
    }),
  ]);
  const reporteeData = reportee.ok ? await reportee.json<any>() : {
    username: '（取得失敗）',
    name: null,
    avatarUrl: null,
  };
  const reporterData = reporter.ok ? await reporter.json<any>() : {
    username: '（取得失敗）',
    name: null,
    avatarUrl: null,
  };
  const body = {
    content: `🚨 新たな通報\n[**通報ページに行く**](${misskeyUrl}/admin/abuses)`,
    embeds: [
      {
        color: 16711680,
        description: data.comment,
        author: {
          name: reporteeData.name || reporteeData.username,
          icon_url: reporteeData.avatarUrl
        },
        footer: {
          text: `${reporterData.name || reporterData.username} からの通報`,
          icon_url: reporterData.avatarUrl,
        },
        timestamp: new Date().toISOString(),
      }
    ],
  };

  await fetch(webhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};