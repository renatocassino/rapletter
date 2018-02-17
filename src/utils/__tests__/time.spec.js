import { fancyTimeFormat } from '../time'

describe('fancyTimeFormat', () => {
  it('should convert 10 seconds', () => {
    expect(fancyTimeFormat(10)).toBe('00:10')
  })

  it('should convert 1 minute', () => {
    expect(fancyTimeFormat(60)).toBe('01:00')
  })

  it('should convert 1 minute and 1 second', () => {
    expect(fancyTimeFormat(61)).toBe('01:01')
  })

  it('should convert 1 hour', () => {
    expect(fancyTimeFormat(3600)).toBe('01:00:00')
  })

  it('should convert 1 hour and 1 minute', () => {
    expect(fancyTimeFormat(3660)).toBe('01:01:00')
  })

  it('should convert 1 hour and 1 minute and 1 second', () => {
    expect(fancyTimeFormat(3661)).toBe('01:01:01')
  })
})
