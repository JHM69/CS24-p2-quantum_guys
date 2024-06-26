/* eslint-disable react/prop-types */
import React from 'react'
import UpdateLandfill from '../Landfill/UpdateLandfill'
import LandfillInfo from '../Landfill/ViewLandfill'

const LandfillItem = ({ name, capacity, lat, lon,startTime,endTime, address, managers, id }) => {
  return (
    <div className="smooth-effect my-2 flex cursor-pointer items-center rounded-md border px-3 py-4 shadow-sm hover:bg-green-100 hover:shadow lg:px-6">
      <p className="flex-1 truncate font-bold">{name}</p>

      <div className="flex-1 truncate px-2 font-medium">
        Capacity : {capacity} Ton
      </div>

      <div className="flex-1 truncate px-2 font-medium">
        {managers &&
          managers.map((manager) => <p key={manager.id}>{manager.name}</p>)}
      </div>

      <LandfillInfo
        landfill={{
          name,
          capacity,
          lat,
          lon,
          startTime,
          endTime,
          address,
          managers,
          id,
        }}
      />

      <UpdateLandfill
        landfill={{
          name,
          capacity,
          lat,
          lon,
          startTime,
          endTime,
          address,
          managers,
          id,
        }}
      />
    </div>
  )
}

export default LandfillItem
