/* eslint-disable react/react-in-jsx-scope */
import { Disclosure } from '@headlessui/react'
import clsx from 'clsx'
import ChevronRight from './icons/ChevronRight'

export default function FormSection ({ title, children, ...props }) {
  return (
    <Disclosure as="div" {...props}>
      {({ open }) => (
        <>
          <Disclosure.Button
            as="div"
            className={clsx(
              'bg-blue-100 smooth-effect flex items-center justify-between rounded-md border p-3 font-medium',
              !open && 'shadow-sm hover:shadow-md'
            )}
          >
            {title}
            <ChevronRight
              className={clsx(
                'text-gray-600',
                open && 'rotate-90 smooth-effect transform duration-400'
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel as="div" className="rounded p-3 shadow-sm">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
