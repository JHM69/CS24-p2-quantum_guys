/* eslint-disable multiline-ternary */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getBaseUrl } from '../../utils/url' 
import ContractorItemsSkeleton from '../../components/Contractors/ContractorItemsSkeleton'
import ContractorEntryItems from '../../components/ContractorEntrys/ContractorEntryItems'
import Layout from '../../components/layout' 
import MapView from '../../components/common/MapView'
import AddWasteEntry from '../../components/WasteEntry/AddWasteEntry'
import WasteItemsSkeleton from '../../components/WasteEntrys/WasteEntryItemsSkeleton'
import WasteEntryItems from '../../components/WasteEntrys/WasteEntryItems'
import { NoSSR } from '../../components/common/NoSSR'
import ProgressBar from '../../components/common/ProgressBar'
import AddContractorEntry from '../../components/ContractorEntry/AddContractorEntry'

export default function VehicleEntry () {
  const [loading, setLoading] = useState(true)
  const [loadingInfo, setLoadingInfo] = useState(true)
  const [contractorEntries, setContractorEntries] = useState([])
  const [wasteEntries, setWasteEntries] = useState([])

  const [contractor, setContractor] = useState({})

  const [contractorId, setContractorId] = useState(null)

  const router = useRouter()

  useEffect(() => {
    setContractorId(router.query.contractorId)
  }, [router.query.contractorId])

  useEffect(() => {
    if (contractorId === null) {
      //console.log('contractorId is null')
      return
    }
    setLoadingInfo(true)
    const token = localStorage.getItem('token')
    if (token) {
      axios
        .get(getBaseUrl() + `/contractor/${contractorId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          setLoadingInfo(false)
          setContractor(res.data)
          console.log(res.data)
        })
        .catch((err) => {
          alert(err);
          setLoadingInfo(false)
          console.log(err)
        })
    }
  }, [contractorId])

  useEffect(() => {
    if (contractorId === null) return
    setLoading(true)
    const token = localStorage.getItem('token')
    if (token.length > 0) {
      axios
        .get(getBaseUrl() + `/contractor/${contractorId}/employees`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          console.log(res.data)
          res.data.sort((a, b) => b.id - a.id)
          setContractorEntries(res.data)
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
        })
    }
  }, [contractorId])

  useEffect(() => {
    if (contractorId === null) return
    setLoading(true)
    const token = localStorage.getItem('token')
    if (token.length > 0) {
      axios
        .get(getBaseUrl() + `/contractor/${contractorId}/add`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          console.log(res.data)
          res.data.sort((a, b) => b.id - a.id)
          setWasteEntries(res.data)
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
        })
    }
  }, [contractorId])

  return (
    <NoSSR>
    <div>
      <div className="flex w-full flex-col">
        <div className="mx-6 mt-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-700">Contractor Info </h1>
        </div>
        {loadingInfo ? (
          <div className="cursor-loading mx-6 my-2 flex animate-pulse space-x-16 rounded-md border px-6 py-4 shadow-sm">
            <div className="h-10 m-3 mt-3 flex-1 rounded bg-gray-200"></div>
            <div className="h-[200px] flex-1 rounded bg-gray-200"></div>
          </div>
        ) : (
          <div className="mx-6 block  max-h-[75vh] overflow-y-auto rounded-lg border p-2 desktop:max-h-[80vh]">
            <div className="flex  flex-row ">
              <div className="w-1/2 px-4 gap-4">
                <p className="text-md my-2 font-semibold">Company: {contractor.companyName}</p>
                <p className="text-md  my-2">Registration Number: {contractor.registrationId}</p>
                {/* <ProgressBar
                  currentWasteVolume={contractor?.currentWasteVolume}
                  capacity={contractor?.capacity}
                /> */}
              </div>
              {/* <div className="w-1/2">
                <MapView
                    lat={contractor.lat}
                    lon={contractor.lon}
                    name={contractor.wardNumber}
                    address={contractor.address}
                    height = '200px'
                    // vehicles = {contractor.vehicles}
                />
              </div> */}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-row gap-3 md:px-6">
        <div className="flex w-full flex-col">
          <div className="mt-3 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-700">
              Employee Entries{' '}
            </h1>
            <div className="flex items-center space-x-2">
                {contractorId && <AddContractorEntry contractorId={contractorId} />}  
            </div>
          </div>
          {loading ? (
            <ContractorItemsSkeleton />
          ) : (
            <ContractorEntryItems contractorEntries={contractorEntries} />
          )}
        </div>

        {/* <div className="flex w-1/3   flex-col">
          <div className="mt-3 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-700">
              Waste Entries
            </h1>
            <div className="flex items-center space-x-2">
              {contractorId && <AddWasteEntry contractorId={contractorId} />}
            </div>
          </div>
          {loading ? (
            <WasteItemsSkeleton />
          ) : (
            <WasteEntryItems wasteEntries={wasteEntries} />
          )}
        </div> */}
      </div>
    </div>
    </NoSSR>
  )
}
 
VehicleEntry.getLayout = function getLayout (page) {
  return <Layout meta={{ name: 'Contractor Entries' }}>{page}</Layout>
}
