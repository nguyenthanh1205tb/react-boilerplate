import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'
import { Accept, DropzoneOptions, useDropzone } from 'react-dropzone'

import UploadImg from 'src/assets/images/upload.png'

interface DropzoneProps extends DropzoneOptions {
  onDrop?: (file: File[]) => void
  accept?: Accept
  small?: boolean
}
function Dropzone({ onDrop, accept, small, ...props }: PropsWithChildren<DropzoneProps>) {
  const { getInputProps, getRootProps, isDragActive } = useDropzone({ onDrop, accept, ...props })

  return (
    <div
      {...getRootProps()}
      className={classNames('w-full mt-4 flex items-center cursor-pointer', {
        'border-blue-500': isDragActive,
        'bg-gray-50 rounded-xl border-dashed border-2 justify-center': !small,
      })}
      style={{ height: !small ? '400px' : 'auto' }}>
      <input {...getInputProps()} />
      <div
        className={classNames('flex flex-col items-center justify-center space-y-2', {
          '!flex-row': small,
        })}>
        <div
          className={classNames({
            'w-24 h-24 flex items-center justify-center bg-gray-50 border-dashed border-2 rounded-xl': small,
            'border-blue-500': isDragActive && small,
          })}>
          <img className="w-10" src={UploadImg} />
        </div>
        <div className={classNames({ 'ml-4': small, 'text-center': !small })}>
          <p>
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-sm text-gray-500">(MAX. 2 MB per file)</p>
        </div>
      </div>
    </div>
  )
}
export default Dropzone
