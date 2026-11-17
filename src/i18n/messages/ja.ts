import overlay from "./overlays/ja.json";

export const messages = {
  ui: {
    home: "ホーム",
    language: "言語",
    theme: "テーマ",
    about: "自己紹介",
    education: "学歴",
    experience: "経歴",
    resume: "履歴書",
    download: "ダウンロード",
    showLess: "閉じる",
    more: "+{count}件",
    projectsCount: "{count}件のプロジェクト",
    projectsCountPlural: "{count}件のプロジェクト",
    clientsCount: "{count}社のクライアント",
    clientsCountPlural: "{count}社のクライアント",
    contact: "連絡先",
    getInTouch: "お問い合わせ",
    contactBodyBefore: "ご連絡は",
    contactBodyOr: "またはメール",
    contactBodyAfter: "まで。可能なときに返信します。",
    myProjects: "プロジェクト",
    projectsHeading: "最近の成果を見る",
    projectsIntro:
      "シンプルなウェブサイトから複雑なWebアプリまで、さまざまなプロジェクトに取り組んできました。お気に入りをいくつか紹介します。",
    greeting: "はじめまして、{name}です",
    present: "現在",
  },
  ...overlay,
} as const;
