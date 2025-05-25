import useVisitors from '@/hooks/use-visitors';

export type ZoneIdPropos = {
  readonly zoneId: string | undefined;
};
export default function Visitor({ zoneId }: ZoneIdPropos) {
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
    <div className='move-horizontal flex w-20 gap-4'>
      {Array.from({ length: countVisitorZone }, (_, index) => (
        <img
          src={`/images/creatures/${visitorZone?.src_image}`}
          alt={visitorZone?.category}
          title={visitorZone?.category}
          className='move-vertical'
          key={index}
        />
      ))}
    </div>
  );
}
