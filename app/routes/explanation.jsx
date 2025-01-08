const Explanation = () => {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
      }}
    >
      <h1 style={{ color: "#4CAF50", textAlign: "center" }}>
        🌍 カードバトルへようこそ！
      </h1>
      <h2 style={{ color: "#FF5722" }}>＜目的・概要＞</h2>
      <p>
        勝利目標は、<strong>相手のHPを0にすること</strong>
        です！このゲームのカードの強さは、<strong>現実の地球の環境</strong>
        とリンクしています。
      </p>
      <ul>
        <li>
          カードの値は「その瞬間のその土地の天気」と「気温」から決まります。
        </li>
        <li>
          プレイヤーは、カードの攻守を考えながら
          <strong>最適なカードを選ぶ</strong>必要があります。
        </li>
      </ul>

      <h2 style={{ color: "#FF9800" }}>＜ルール＞</h2>
      <ol>
        <li>
          プレイヤーは順番に<strong>攻撃カード</strong>と
          <strong>防御カード</strong>を選びます。
        </li>
        <li>
          カードの「気温」と「天気の特殊効果」に基づいてダメージが計算されます。
        </li>
        <li>どちらかのHPが0になると勝敗が決まります。</li>
      </ol>

      <h2 style={{ color: "#03A9F4" }}>＜ゲームの要素＞</h2>
      <h3 style={{ color: "#009688" }}>🗺 用意されている国一覧</h3>
      <p>
        以下の国々がカードとして登場します。
        <br />
        世界中の天候を想像しながら、<strong>戦略的に選択</strong>しましょう！
      </p>
      <div style={{ columns: 3, columnGap: "20px" }}>
        <ul>
          <li>日本</li>
          <li>フランス</li>
          <li>アメリカ</li>
          <li>カナダ</li>
          <li>メキシコ</li>
          <li>ブラジル</li>
          <li>アルゼンチン</li>
          <li>コロンビア</li>
          <li>チリ</li>
          <li>イギリス</li>
          <li>ドイツ</li>
          <li>イタリア</li>
          <li>スペイン</li>
          <li>ロシア</li>
          <li>スウェーデン</li>
          <li>ポーランド</li>
          <li>エジプト</li>
          <li>中国</li>
          <li>ナイジェリア</li>
          <li>ケニア</li>
          <li>モロッコ</li>
          <li>インド</li>
          <li>韓国</li>
          <li>サウジアラビア</li>
          <li>タイ</li>
          <li>トルコ</li>
          <li>オーストラリア</li>
          <li>ニュージーランド</li>
          <li>イスラエル</li>
          <li>イラン</li>
          <li>アラブ首長国連邦</li>
          <li>シンガポール</li>
          <li>マレーシア</li>
          <li>パキスタン</li>
          <li>フィリピン</li>
          <li>バングラデシュ</li>
          <li>オランダ</li>
          <li>ギリシャ</li>
          <li>インドネシア</li>
          <li>エクアドル</li>
        </ul>
      </div>

      <h3 style={{ color: "#673AB7" }}>⛅ 用意されている天気と特殊効果</h3>
      <p>
        天候はゲームのカギを握る重要な要素です。それぞれの天候に応じた
        <strong>特殊効果</strong>があります！
      </p>
      <ul>
        <li>
          <strong>Clouds:</strong> 防御力アップ
        </li>
        <li>
          <strong>Drizzle:</strong> 小さな攻撃力強化
        </li>
        <li>
          <strong>Rain:</strong> 攻撃力中アップ
        </li>
        <li>
          <strong>Snow:</strong> 防御力大アップ
        </li>
        <li>
          <strong>Clear:</strong> 攻撃力大アップ
        </li>
        <li>
          <strong>Thunderstorm:</strong> 特大攻撃力アップ
        </li>
      </ul>
    </div>
  );
};

export default Explanation;
