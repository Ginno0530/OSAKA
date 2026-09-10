const qs=(s,r=document)=>r.querySelector(s),qsa=(s,r=document)=>[...r.querySelectorAll(s)];

const mapData={
  umeda:{tag:'SKYLINE HUB / UMEDA',title:'梅田・スカイリンク',description:'OSAKA最大級の交通・商業ハブ。現実の梅田を基礎に、高層ビル間を結ぶ空中回廊と屋上広場が大きく発達しています。初ログインユーザーの待ち合わせ場所としても定番。',features:['虹環線 OSAKA駅','空中商店街','クジラ観測デッキ']},
  nakanoshima:{tag:'CIVIC & WATER / NAKANOSHIMA',title:'中之島・リバーコア',description:'水辺の景観と公共施設が集まる落ち着いたエリア。運営関連施設や大型イベント会場も多く、昼と夜で表情が大きく変わります。',features:['リバーライト遊歩道','OSAKA市民ホール','運営インフォメーション']},
  namba:{tag:'ENTERTAINMENT / NAMBA',title:'難波・ミッドナイト',description:'ショップ、ライブ、飲食、アバター文化の中心地。いつ訪れても人が多く、OSAKAらしい派手さと熱気をもっとも感じやすいエリアです。',features:['アバターファッション街','道頓堀イベント水路','24Hフードストリート']},
  shinsekai:{tag:'RETRO FANTASY / SHINSEKAI',title:'新世界・ワンダー',description:'古い大阪の空気を残しながら、現実にはない地下区画や幻想商店街が広がるレトロファンタジー地区。探索好きから人気。',features:['ゼログラビティ横丁','旧OSAKAデータ街','通天閣ビューポイント']},
  tennoji:{tag:'PARK & EVENT / TENNOJI',title:'天王寺・サニーパーク',description:'公園、ライブ広場、季節イベントが集まる開放的なエリア。家族向けアバターイベントや大規模フェスの開催地として知られます。',features:['サンライトステージ','100¥EN食堂街','季節イベントゲート']},
  bay:{tag:'LOGIN & OCEAN / BAY',title:'OSAKAベイ・ゲート',description:'海と空が大きく開けた湾岸エリア。ログインゲート、ヘッドギアサポート、初心者向け施設が集まり、クジラを間近で見られる場所としても人気です。',features:['HELLOVERSEゲート','五感キャリブレーションラウンジ','ホエールウォーク']}
};
qsa('.map-point').forEach(btn=>btn.addEventListener('click',()=>{qsa('.map-point').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const d=mapData[btn.dataset.area];if(!d)return;qs('#map-tag').textContent=d.tag;qs('#map-title').textContent=d.title;qs('#map-description').textContent=d.description;qs('#map-features').innerHTML=d.features.map(x=>`<li>${x}</li>`).join('');}));

const wallet=qs('#wallet-balance');if(wallet){let balance=Number(wallet.textContent.replace(/,/g,''));qsa('[data-charge]').forEach(btn=>btn.addEventListener('click',()=>{balance+=Number(btn.dataset.charge);wallet.textContent=balance.toLocaleString('ja-JP');btn.textContent='CHARGED ✓';setTimeout(()=>btn.textContent=`+${Number(btn.dataset.charge).toLocaleString('ja-JP')} ¥EN`,850);}));}

const agents={
  mio:{name:'蒼井ミオ',role:'SYSTEM REPAIR',hello:'こんにちは、トラブルシューターのミオです。OSAKAで困っていることを教えてください。'},
  ruka:{name:'桃瀬ルカ',role:'PLAYER SUPPORT',hello:'こんにちは！ルカです。迷子でも操作でも大丈夫。一緒に確認していこう！'},
  akari:{name:'日向アカリ',role:'EVENT SAFETY',hello:'アカリやで！イベントや混雑で困ってることあったら、遠慮なく言ってな！'},
  nagi:{name:'翠川ナギ',role:'TRANSIT GUIDE',hello:'ナギです。行き先や移動ルートで困っていますか？ 現在地から案内できます。'},
  rei:{name:'紫藤レイ',role:'NIGHT PATROL',hello:'レイです。夜間のトラブルなら任せて。状況を順番に教えてください。'},
  yura:{name:'白波ユラ',role:'SENSE SYNC',hello:'ユラです。五感同期やヘッドギア接続の違和感を一緒に確認しましょう。'}
};
let activeAgent='mio';const log=qs('#chat-log');
function selectAgent(id){if(!agents[id]||!log)return;activeAgent=id;qsa('.support-agent').forEach(x=>x.classList.toggle('active',x.dataset.agent===id));qs('#agent-name').textContent=agents[id].name;qs('#agent-role').textContent=` / ${agents[id].role} — ONLINE`;log.innerHTML=`<div class="bubble agent">${agents[id].hello}</div>`;}
qsa('.support-agent').forEach(btn=>btn.addEventListener('click',()=>selectAgent(btn.dataset.agent)));
const initialAgent=new URLSearchParams(location.search).get('agent');if(initialAgent&&agents[initialAgent])selectAgent(initialAgent);
function reply(text){const lower=text.toLowerCase();if(text.includes('迷子')||text.includes('場所'))return '現在地を確認します。近くのランドマークか、行きたいエリアを教えてください。OSAKAマップから安全なルートを案内します。';if(text.includes('アバター')||text.includes('表示'))return '表示異常ですね。まずアバターの再描画を試します。改善しない場合は、その場でトラブルシューターの修復対応へ切り替えます。';if(text.includes('¥EN')||text.includes('お金')||lower.includes('yen'))return '¥ENはOSAKA内の公式通貨です。街で働いて獲得するほか、現実通貨から公式チャージできます。ショップページでも使い道を確認できます。';if(text.includes('五感')||text.includes('味')||text.includes('触'))return '五感同期に違和感がある場合は無理に続けず、キャリブレーションを確認します。特に触覚や平衡感覚のずれはユラ担当へ引き継げます。';return `${agents[activeAgent].name}です。内容を確認しました。このデモでは一般案内までですが、OSAKA内では担当トラブルシューターが状況に合わせて対応します。`;}
function send(text){if(!log||!text.trim())return;const user=document.createElement('div');user.className='bubble user';user.textContent=text.trim();log.appendChild(user);setTimeout(()=>{const a=document.createElement('div');a.className='bubble agent';a.textContent=reply(text);log.appendChild(a);log.scrollTop=log.scrollHeight;},280);log.scrollTop=log.scrollHeight;}
qsa('[data-topic]').forEach(btn=>btn.addEventListener('click',()=>send(btn.dataset.topic)));
const form=qs('#chat-form');if(form)form.addEventListener('submit',e=>{e.preventDefault();const input=qs('#chat-input');send(input.value);input.value='';});