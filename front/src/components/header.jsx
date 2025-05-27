import img from '@/assets/nextTech.png';

export function Header() {
  return (
    <div className="p-10 flex gap-3 justify-center font-bold text-3xl">
      <img src={img} alt="next tech logo" className="h-10" />
      <h1>NEXT Tech</h1>
    </div>
  );
}
