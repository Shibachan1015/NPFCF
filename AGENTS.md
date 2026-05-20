# AGENTS.md

奈良県履物協同組合連合会 公式サイトのリポジトリ。`assets/css/style.css` ＋ `assets/js/main.js` を共有する複数ページ構成。

## ページ構成

| ファイル | 内容 |
|---|---|
| `index.html` | メインページ（トップ／ご挨拶／ギャラリー／主要製品／組合員／取り組み／お問い合わせ） |
| `narahakimono.html` | 「ならはきもの」地域団体商標・奈良ブランド委員会の専用ページ |

- ビルドシステム（テンプレート）は無いため、**ヘッダー（ロゴ＋ナビ＋トグル）とフッターは各 HTML に重複コピー**されている。ナビ項目やヘッダーを変更したら**全ページを手動で同期**すること。
- ページ間のナビリンクは `index.html#message` 形式。同一ページ内アンカーのみ `#xxx`。`main.js` のスムーススクロールは `a[href^="#"]` のみ対象なので、ページ間リンクは通常遷移になる（`html { scroll-padding-top }` で sticky ヘッダー分を吸収）。
- ホスティング: 本番はさくらのレンタルサーバー（印刷物に URL 記載あり）。GitHub Pages（`main` ブランチ）でも公開中。将来 Cloudflare ＋独自ドメインへ移行予定。

---

# テーマ: ならはきものネイビー

このサイトに現在適用しているデザインシステム全体を **「ならはきものネイビー」** テーマと呼ぶ。白・黒・赤を基調に、濃紺（ネイビー）をブランドカラーとした構成。デザイントークンは `assets/css/style.css` の CSS 変数で一元管理し、ライト／ダークの 2 モードを持つ。**色・余白・フォント等を新たにハードコードせず、必ず以下のトークンを使うこと。**

## カラートークン

CSS 変数は `:root`（ライト）と `[data-theme="dark"]`（ダーク）で定義。

| 変数 | ライト | ダーク | 用途 |
|---|---|---|---|
| `--primary-color` | `#1F3A5F` | `#6B9BD1` | ブランドの主色。見出し下線、ボタン枠線、ホバー |
| `--secondary-color` | `#3A5A87` | `#8AAFD8` | 補助アクセント |
| `--accent-color` | `#5E7BA6` | `#A7C0DF` | 軽いアクセント |
| `--link-color` | `#1F3A5F` | `#7BA3D9` | 本文中のリンク（組合員プロフィール等） |
| `--text-primary` | `#1a1a1a` | `#e0e0e0` | 見出し・強調テキスト |
| `--text-secondary` | `#4a4a4a` | `#b0b0b0` | 本文テキスト |
| `--bg-white` | `#ffffff` | `#2d2d2d` | カード・基本背景 |
| `--bg-light` | `#f8f9fa` | `#1a1a1a` | 偶数セクションの背景 |
| `--border-color` | `#e8e8e8` | `#404040` | 枠線 |
| `--shadow-sm/md/lg` | rgba 黒 0.08/0.12/0.15 | rgba 黒 0.3/0.4/0.5 | カードの影（3 段階） |
| `--gradient-text` | `黒→赤` (#000→#ff0000) | `白→赤` (#fff→#ff6666) | 見出しの装飾グラデーション |

赤系グラデーション `--gradient-text` は `<h2>` 見出しテキストと見出し下のバー（60×4px）に使用。ネイビーと赤の 2 アクセント構成。

## タイポグラフィ

- フォント: `Zen Kaku Gothic New`（和文）＋ `Inter`（欧文）。Google Fonts から import。フォールバックは Hiragino / Meiryo 系 sans-serif。
- 基本: `16px` / `line-height: 1.75` / `letter-spacing: 0.03em` / `font-weight: 400`。
- セクション見出し `<h2>`: `2.2rem` / `font-weight: 700` / `--gradient-text` 適用 / 下に 60×4px のバー。
- 本文 `.content p`: `1.05rem` / `line-height: 2` / `text-align: justify`。

## レイアウト

- `.container`: `max-width: 1200px`、左右 padding `20px`。
- `.section`: 上下 padding `80px`。偶数番目は背景 `--bg-light`。
- `.content`: `max-width: 900px`。

## コンポーネント／インタラクション

- **カード**（`.product-item` / `.company-item` / `.hakimono-block` 等）: 背景 `--bg-white`、`padding: 35px`、`border-radius: 12〜16px`、`box-shadow: --shadow-sm`、枠線 `--border-color`。
- **ホバー効果**: `transform: translateY(-5〜8px)` の浮き上がり ＋ 影を `--shadow-md` に強調。トランジションは一律 `0.3s ease`。
- **グリッド**: ギャラリーは `auto-fit / minmax(280px,1fr)`、製品は `minmax(320px,1fr)`。
- スクロールは `scroll-behavior: smooth`（ナビのアンカー遷移）。

## モード切替

- **ダークモード**: ヘッダーの 🌙 ボタン。`html` の `data-theme` 属性を `light`/`dark` で切替、`localStorage('theme')` に保存。FOUC 防止スクリプトを `<head>` に配置。
- **言語**: EN/JA ボタン。`html` の `lang` 属性を `ja`/`en` で切替、`localStorage('lang')` に保存。

---

# 実装規約

- **国際化**: 全コンテンツは日英 bilingual。`lang="ja"` / `lang="en"` 属性を付けた要素を併記し、`html[lang="ja"] [lang="en"] { display:none }` 系の CSS で表示を切替。新規コンテンツも必ず両言語ペアで追加すること。
- **ブランチ運用**: `develop` で作業 → コミット → `main` へ fast-forward マージ → 両ブランチを push。公開は `main` への push で反映（GitHub Pages のビルドに 1〜2 分）。
