// Pointer ownership stays fixed for the entire gesture, including crossing the screen center.
export class TouchGestures {
 constructor(actions){this.a=actions;this.pointers=new Map();this.move={x:0,y:0};}
 down(id,x,y,width,time){const side=x<width/2?'left':'right';if([...this.pointers.values()].some(p=>p.side===side))return false;this.pointers.set(id,{side,x,y,ox:x,oy:y,start:time,drag:false,held:false});if(side==='left')this.a.stick?.({x,y,dx:0,dy:0});return true;}
 motion(id,x,y){const p=this.pointers.get(id);if(!p)return;const dx=x-p.ox,dy=y-p.oy;if(Math.hypot(dx,dy)>12)p.drag=true;if(p.side==='left'){let length=Math.hypot(dx,dy),scale=Math.min(1,length/52);this.move.x=length>9?dx/length*scale:0;this.move.y=length>9?-dy/length*scale:0;this.a.stick?.({x:p.ox,y:p.oy,dx:dx/Math.max(1,length/52),dy:dy/Math.max(1,length/52)});}else if(p.drag){this.a.look(x-p.x,y-p.y,p.held);}p.x=x;p.y=y;}
 tick(time){for(const p of this.pointers.values())if(p.side==='right'&&!p.drag&&!p.held&&time-p.start>=260){p.held=true;this.a.draw();}}
 up(id,time,cancel=false){const p=this.pointers.get(id);if(!p)return;this.pointers.delete(id);if(p.side==='left'){this.move.x=this.move.y=0;this.a.stick?.(null);if(!cancel&&!p.drag&&time-p.start<350)this.a.context();}else if(cancel){this.a.cancel();}else if(p.held){this.a.release();}else if(!p.drag&&time-p.start<350){this.a.tap();}}
 reset(){this.pointers.clear();this.move.x=this.move.y=0;this.a.cancel();this.a.stick?.(null);}
}
