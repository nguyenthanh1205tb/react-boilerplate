import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { BiError } from 'react-icons/bi'
import { FaRegDotCircle } from 'react-icons/fa'
import { FiLoader } from 'react-icons/fi'

import { WatermarkListLinkDownload } from 'src/configs/Types'
import { useAddWatermarkPDFFile } from 'src/hooks/usePdfAPI'

import ButtonSave from '../Common/Button/Save'
import PDFPage from './page'

interface WatermarkProps {
  file: File
  loading: boolean
}
function Watermark({ file, loading }: PropsWithChildren<WatermarkProps>) {
  const [text, setText] = useState<string>()
  const watermarkEl = useRef<HTMLDivElement>(null)
  const { addWatermarkPDFFile } = useAddWatermarkPDFFile()
  const [linkDownload, setLinkDownload] = useState<WatermarkListLinkDownload[]>([])

  useEffect(() => {
    const wEl = watermarkEl.current
    if (wEl && text) {
      wEl.dataset.watermark = (wEl.dataset.watermark + '   ').repeat(300)
    }
  }, [text])

  const updateLinkDownload = (position: number, data: Partial<WatermarkListLinkDownload>) => {
    setLinkDownload(prev =>
      prev.map((o, i) => {
        if (i === position) {
          return { ...o, ...data }
        }
        return o
      }),
    )
  }

  const addWatermark = async () => {
    if (!text || !text.length || loading) return
    const length = linkDownload.slice(0).length
    setLinkDownload(prev => [...prev, { fileName: file.name, text: text, loading: true, link: '', err: false }])
    const result = await addWatermarkPDFFile({
      file: file,
      msg: text,
    })
    if (result) {
      updateLinkDownload(length, { link: result.data.link, loading: false })
    } else {
      updateLinkDownload(length, { err: true })
    }
  }

  return (
    <div className="mt-4 divide-y">
      <div className="flex items-center space-x-8">
        <div className="w-48">
          <PDFPage>
            <div
              ref={watermarkEl}
              data-watermark={text ?? ''}
              className="absolute w-full h-full top-0 left-0 watermarked"></div>
          </PDFPage>
        </div>
        <div className="form-control w-full">
          <p className="mb-2 text-sm text-gray-500">Write your watermark here:</p>
          <input
            type="text"
            onChange={e => setText(e.target.value)}
            placeholder="Type text here"
            className="input input-bordered w-full"
          />
        </div>
      </div>
      <div className="mt-8 pt-8">
        <div className="flex w-full justify-start items-center">
          <ButtonSave type="save" onClick={addWatermark} disabled={!text || !text.length || loading}>
            Add watermark
          </ButtonSave>
        </div>
        {linkDownload.length ? (
          <div className="mt-4 flex flex-col space-y-2">
            <p className="text-sm italic">Click to download</p>
            <ul className="flex flex-col space-y-2 divide-y divide-gray-50">
              {linkDownload.map((l, index) => (
                <li key={index} className="w-full pt-1">
                  <a
                    className="flex items-center space-x-2 whitespace-nowrap overflow-hidden text-ellipsis"
                    rel="noreferrer"
                    href={l.link === '' ? '#' : l.link}
                    target="_blank">
                    {l.err ? (
                      <BiError className="text-red-500" />
                    ) : l.loading ? (
                      <FiLoader className="animate-spin text-yellow-500" />
                    ) : (
                      <FaRegDotCircle className="text-emerald-500" />
                    )}
                    <p>{l.fileName}</p>
                    <p>-</p>
                    <p className="font-semibold">{l.text}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}
export default Watermark
