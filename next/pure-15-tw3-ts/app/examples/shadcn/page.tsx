import CalendarDemo from '@/shadcn/CalendarDemo';
import DropdownMenuDemo from '@/shadcn/DropdownMenuDemo';
import SliderDemo from '@/shadcn/SliderDemo';

const  examplesShadcnPage =() => {

  return (
    <>
      <div>
        <CalendarDemo />
      </div>
      <div>
        <DropdownMenuDemo />
      </div>
      <div><SliderDemo /></div>
    </>
  );
}

export default examplesShadcnPage;