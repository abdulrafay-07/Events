type SingleEventProps = {
   params: {
      eventId: string;
   };
};

const SingleEvent = ({
   params,
}: SingleEventProps) => {
   return (
      <div>
         {params.eventId}
      </div>
   )
};

export default SingleEvent;