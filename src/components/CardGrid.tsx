import React from 'react';
import Card from './Card';

interface Props {
  data: any[];
  title: string;
}

const CardGrid: React.FC<Props> = ({ data, title }) => {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
      {data?.length > 0 ? (
        data?.map((post) => <Card key={post._id} {...data} />)
      ) : (
        <h2 className="mt-5 font-bold text-[#6449ff] text-xls uppercase">
          {title}
        </h2>
      )}
    </div>
  );
};

export default CardGrid;
