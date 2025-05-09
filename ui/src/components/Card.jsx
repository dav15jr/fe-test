import React from 'react'

export default function Card({contribution}) {

const now = new Date().toISOString();
const start = contribution.startTime;
const end = contribution.endTime;

let status = '';
let statusColor = '';

if (now > end) {
  status = 'Completed';
  statusColor = 'text-red-500';
} else if (now >= start && now <= end) {
  status = 'Active';
  statusColor = 'text-green-500';
} else if (now < start) {
  status = 'Scheduled';
  statusColor = 'text-yellow-500';
}

const formatedDate = (date) => {
  return new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",     // e.g., Jul 6, 2023
    timeStyle: "short"       // e.g., 4:00 PM
  });
}


  return (
    <div className='border rounded-xl p-2' >
      <h2 className='text-lg' >{contribution.title}</h2>
      <p>{contribution.description}</p>
      <p><span className='font-bold' >From:</span> {formatedDate(contribution.startTime)}</p>
      <p><span className='font-bold' >Till:</span> {formatedDate(contribution.endTime)}</p>
      <p><span className='font-bold' >Producer:</span> {contribution.owner}</p>
      <p><span className='font-bold' >Status: </span><span className={`font-bold ${statusColor}`}>{status}</span></p>
    </div>
  )
}
