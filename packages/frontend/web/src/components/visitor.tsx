import useVisitors from '@/hooks/use-visitors';

export type ZoneIdProps = {
  readonly zoneId: string | undefined;
};
export default function Visitor({ zoneId }: ZoneIdProps) {
  const { visitors } = useVisitors();

  //count the number of visitors in the zone selected and max = 4
  const countVisitorZone = Math.min(
    visitors.reduce((count, element) => {
      return (
        count +
        (Number(element.visitor_id) === Number(zoneId)
          ? Number(element.visitor_count)
          : 0)
      );
    }, 0),
    4,
  );

  //filter to have only visitor on the zone selected
  const visitorZone = visitors.find(
    (visitor) => Number(visitor.visitor_id) === Number(zoneId),
  );

  return (
    <div className='animate-move-horizontal flex w-15 gap-4 will-change-transform'>
      {Array.from({ length: countVisitorZone }, (_, index) => (
        <img
          src={`/images/creatures/${visitorZone?.src_image}`}
          alt={visitorZone?.category}
          title={visitorZone?.category}
          className='animate-move-vertical will-change-transform'
          key={index}
        />
      ))}
    </div>
  );
}
