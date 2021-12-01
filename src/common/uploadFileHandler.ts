export interface FileMetaInformation {
  type: string,
  ext: string,
  semanticExt: 'png' | 'jpg' | 'pdf' | 'doc' | 'docx' | 'xls' | 'ppt' | 'txt',
  category: 'image' | 'document' | 'video' | 'sheets' | 'presentation' | 'text'
}

export const fileAccessListCategory: Array<FileMetaInformation> = [
  { type: 'image/png', ext: '.png', semanticExt: 'png', category: 'image' },
  { type: 'image/jpeg', ext: '.jpg', semanticExt: 'jpg', category: 'image' },
  { type: 'application/msword', ext: '.doc', semanticExt: 'doc', category: 'document' },
  { type: 'application/pdf', ext: '.pdf', semanticExt: 'pdf', category: 'document' },
  { type: 'application/excel', ext: '.xls', semanticExt: 'xls', category: 'sheets' },
  { type: 'application/mspowerpoint', ext: '.ppt', semanticExt: 'ppt', category: 'presentation' },
  { type: 'text/plain', ext: '.txt', semanticExt: 'txt', category: 'text' }
]

export const getFileExt = ( file: File ) => {
  const { type } = file
  return {
    data: fileAccessListCategory.find( item => item.type === type ),
    file
  }
}