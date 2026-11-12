import {useEffect,useRef,useState} from 'react';
import {Volume2,Lightbulb} from 'lucide-react';
import type {Item,Lang,Mode,Question} from './game';
import {characters,wordInfo} from './chinese';
import {TracingBoard} from './TracingBoard';
type Props={mode:Mode;question:Question;solved:boolean;lang:Lang;wrong:string|null;onAnswer:(item:Item)=>void};
export function ChineseActivity({mode,question:q,solved,lang,wrong,onAnswer}:Props){
 const zh=lang==='zh',info=wordInfo(q.answer)!;
 const [hint,setHint]=useState(false),[voiceNote,setVoiceNote]=useState(false),[speaking,setSpeaking]=useState(false);
 const utterance=useRef<SpeechSynthesisUtterance|null>(null);
 useEffect(()=>()=>{if('speechSynthesis'in window)window.speechSynthesis.cancel()},[]);
 function say(){if(!('speechSynthesis'in window)){setVoiceNote(true);setHint(true);return}window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(q.answer.zh);utterance.current=u;u.lang='zh-CN';u.rate=.65;const voice=window.speechSynthesis.getVoices().find(v=>/^zh[-_]CN$/i.test(v.lang))||window.speechSynthesis.getVoices().find(v=>/^(zh|cmn)/i.test(v.lang));if(voice)u.voice=voice;u.onstart=()=>setSpeaking(true);u.onend=()=>setSpeaking(false);u.onerror=()=>{setSpeaking(false);setVoiceNote(true);setHint(true)};window.speechSynthesis.speak(u)}
 const labels=mode==='listen'?[zh?'点喇叭听一听，再找图片':'Listen to the Chinese word, then find its picture',zh?'可以反复听，不用着急':'Listen as many times as you like']:mode==='hanzi'?[zh?'找出一样的汉字':'Find the same Chinese character',zh?'先看一看字的样子':'Look carefully at the shape of the character']:mode==='reading'?[zh?'这张图片的中文名字是？':'Which Chinese word matches the picture?',zh?'还不认识？点提示，跟读学一学':'New word? Tap the hint and learn together']:[zh?'用小手描一描':'Let’s trace a Chinese character',zh?'跟着绿点，一笔一笔来':'Follow the green dot, one stroke at a time'];
 return <div className="chinese-activity"><h2 className="chinese-question">{labels[0]}</h2><p className="question-help">{labels[1]}</p><div className="chinese-lesson">
 {mode==='listen'?<><button className={`listen-orb ${speaking?'is-speaking':''}`} onClick={say} aria-label={zh?'播放中文发音':'Play Chinese pronunciation'}><Volume2 size={45}/></button><strong className="lesson-hanzi">{q.answer.zh}</strong><span className="pinyin">{info.pinyin}</span>{(hint||solved)&&<span className="hint-picture">{q.answer.icon}</span>}</>:mode==='hanzi'?<><strong className="lesson-character">{q.answer.zh}</strong><span className="pinyin">{info.pinyin}</span></>:mode==='reading'?<><span className="lesson-picture">{q.answer.icon}</span>{(hint||solved)&&<><strong className="lesson-hanzi">{q.answer.zh}</strong><span className="pinyin">{info.pinyin}</span></>}</>:<div className="trace-word"><span>{q.answer.icon}</span><div><strong>{q.answer.zh}</strong><span className="pinyin">{info.pinyin}</span></div></div>}
 {mode!=='listen'&&(mode!=='reading'||hint||solved)&&<button className="word-audio secondary" onClick={say}><Volume2 size={19}/>{zh?'听一听 · 跟我读':'Listen & repeat'}</button>}
 {(mode==='listen'||mode==='reading')&&!solved&&<button className="word-hint" onClick={()=>{setHint(h=>!h)}}><Lightbulb size={16}/>{hint?(zh?'收起提示':'Hide hint'):(mode==='listen'?(zh?'看图提示':'Picture hint'):(zh?'学一学 · 看汉字和拼音':'Learn the word & pinyin'))}</button>}
 {voiceNote&&<p className="voice-note" role="status">{zh?'设备暂时无法播放中文语音，可以先看图认字。请在系统中启用普通话语音后再试。':'Chinese speech is unavailable on this device. Use the picture hint, or enable a Mandarin voice in system settings.'}</p>}
 </div>
 {mode==='tracing'?<TracingBoard character={characters.find(c=>c.id===q.answer.id)!} done={solved} zh={zh} onComplete={()=>onAnswer(q.answer)}/>:<div className="options chinese-options">{q.options.map(o=><button key={o.id} disabled={solved} data-answer-id={o.id} className={`option ${wrong===o.id?'wrong':''} ${solved&&o.id===q.answer.id?'correct':''}`} onClick={()=>onAnswer(o)} aria-label={mode==='listen'?(zh?`${o.zh}图片`:`Picture of ${o.en}`):o.zh}>{mode==='listen'?<span className="option-animal">{o.icon}</span>:<span className="hanzi-choice">{o.zh}</span>}{solved&&o.id===q.answer.id&&<span className="answer-check">✓</span>}</button>)}</div>}
 {solved&&<div className="word-celebration"><span>{q.answer.icon}</span><div><strong>{q.answer.zh}</strong><span>{info.pinyin} · {info.en}</span></div><button className="sound" onClick={say} aria-label={zh?'再听一次中文':'Hear the Chinese word again'}><Volume2 size={23}/></button></div>}
 </div>
}
