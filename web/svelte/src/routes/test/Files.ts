import { writable } from "svelte/store";

export type PhotoList = Array<Photo>
export type PhotoExtensions = 'png' | 'jpeg' | 'jpg' | 'heic' | 'gif' | 'tiff'
export class Photo {
  private _file: File
  private _url: string
  constructor(fromFile: File) {
    this._file = fromFile
    this._url = URL.createObjectURL(fromFile)
  }
  public get name(): string { return this._file.name }
  public get url() : string { return this._url }
  public bytes(): Promise<string|ArrayBuffer|null> { 
    let ret = new Promise<string|ArrayBuffer|null>((res, rej) => {
      setTimeout(() => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(this._file)
        reader.addEventListener('error', () => { rej("Error occurred") })
        reader.addEventListener('load', () => { res(reader.result) })
      }, 5000)
    })
    return ret
  }
}
export const selectedFiles = writable([] as PhotoList)