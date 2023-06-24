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
  public get bytes() { return FileReader }
}
export const selectedFiles = writable([] as PhotoList)