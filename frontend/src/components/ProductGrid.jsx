import records from "../../../data/records.json";

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-6">
      {records.map((record) => (
        <div key={record.id} className="bg-gray-800 p-4 rounded-lg text-white flex flex-col items-center w-58 h-72 m-4">
          <img src={record.cover} alt={record.title} className="w-48 h-48 rounded-md object-cover" />
          <h3 className="text-lg font-semibold mt-2">{record.artist}</h3>
          <p className="text-sm">{record.title}</p>
        </div>
      ))}
    </div>
  );
};



export default ProductGrid;
