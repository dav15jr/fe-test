export default function Card({contribution}) {

const now = new Date().toISOString();
const start = contribution.startTime;
const end = contribution.endTime;

let status = '';
let statusColor = '';

if (now > end) {
  status = 'Completed';
  statusColor = 'text-red-500  border-red-600 bg-red-100';
} else if (now >= start && now <= end) {
  status = 'Active';
  statusColor = 'text-green-500 border-green-600 bg-green-100';
} else if (now < start) {
  status = 'Scheduled';
  statusColor = 'text-yellow-600 border-yellow-600 bg-yellow-100';
}

const formatedDate = (date) => {
  return new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",     // e.g., Jul 6, 2023
    timeStyle: "short"       // e.g., 4:00 PM
  });
}


  return (
    <div className="flex flex-col gap-y-1 rounded-xl p-3 max-w-[400px] text-sm md:text-base lg:text-lg shadow hover:bg-gray-100 dark:hover:bg-gray-800 shadow-purple-400 hover:shadow-purple-700 transition-transform duration-300 hover:scale-104">
      <h2 className="text-lg text-center font-semibold">
        {contribution.title}
      </h2>
      <p>{contribution.description}</p>
      <p>
        <span className="font-bold">From:</span>{' '}
        {formatedDate(contribution.startTime)}
      </p>
      <p>
        <span className="font-bold">Till:</span>{' '}
        {formatedDate(contribution.endTime)}
      </p>
      <p>
        <span className="font-bold">Owner:</span> {contribution.owner}
      </p>
      <p>
        <span className="font-bold">Status: </span>
        <span
          className={`font-semibold rounded-full px-2 border ${statusColor}`}
        >
          {status}
        </span>
      </p>
    </div>
  );
}
