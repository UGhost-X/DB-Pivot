
export class BloomFilter {
  size: number
  hashes: number
  buffer: Uint8Array

  constructor(size: number, hashes: number, base64State?: string) {
    this.size = size
    this.hashes = hashes
    if (base64State) {
      if (typeof Buffer !== 'undefined') {
        this.buffer = new Uint8Array(Buffer.from(base64State, 'base64'))
      } else {
        const bin = atob(base64State)
        this.buffer = new Uint8Array(bin.length)
        for (let i = 0; i < bin.length; i++) {
          this.buffer[i] = bin.charCodeAt(i)
        }
      }
    } else {
      this.buffer = new Uint8Array(Math.ceil(size / 8))
    }
  }

  add(str: string) {
    for (let i = 0; i < this.hashes; i++) {
      const idx = this.getHash(str, i) % this.size
      const byteIdx = Math.floor(idx / 8)
      const bitIdx = idx % 8
      this.buffer[byteIdx] |= (1 << bitIdx)
    }
  }

  test(str: string): boolean {
    for (let i = 0; i < this.hashes; i++) {
      const idx = this.getHash(str, i) % this.size
      const byteIdx = Math.floor(idx / 8)
      const bitIdx = idx % 8
      if ((this.buffer[byteIdx] & (1 << bitIdx)) === 0) {
        return false
      }
    }
    return true
  }

  export(): string {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(this.buffer).toString('base64')
    } else {
      let binary = ''
      const len = this.buffer.byteLength
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(this.buffer[i])
      }
      return btoa(binary)
    }
  }

  private getHash(str: string, seed: number): number {
    let hash = 5381 + seed
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i)
    }
    return Math.abs(hash)
  }
}
