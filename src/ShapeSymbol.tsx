import type {Item} from './game';
export function ShapeSymbol({item,color}:{item:Item;color:string}){
 const shapes:Record<string,React.ReactNode>={
  circle:<circle cx="50" cy="50" r="39"/>,square:<rect x="13" y="13" width="74" height="74" rx="4"/>,
  triangle:<polygon points="50,9 94,88 6,88"/>,star:<polygon points="50,4 64,34 97,39 73,62 79,96 50,80 21,96 27,62 3,39 36,34"/>,
  heart:<path d="M50 90L12 53C-10 24 28-3 50 23C72-3 110 24 88 53Z"/>,diamond:<polygon points="50,3 96,50 50,97 4,50"/>,
  oval:<ellipse cx="50" cy="50" rx="45" ry="29"/>,rectangle:<rect x="6" y="23" width="88" height="54" rx="4"/>,
  pentagon:<polygon points="50,4 96,38 79,92 21,92 4,38"/>,hexagon:<polygon points="27,9 73,9 98,50 73,91 27,91 2,50"/>
 };
 return <svg className="shape-symbol" viewBox="0 0 100 100" fill={color} aria-hidden="true">{shapes[item.id]||shapes.circle}</svg>
}
