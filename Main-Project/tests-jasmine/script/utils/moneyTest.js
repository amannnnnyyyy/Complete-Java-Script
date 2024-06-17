import { formatCurrency } from "../../../script/utils/money.js";

describe('test suite: formatCurrency',()=>{
    it('should test basic functionality',()=>{
        expect(formatCurrency(1565)).toBe('$15.65')
    })

    it('should work with zero',()=>{
        expect(formatCurrency(0)).toBe('$0.00')
    })

    it('should work with round up',()=>{
        expect(formatCurrency(2000.5)).toBe('$20.01')
    })

    it('should work with round down',()=>{
        expect(formatCurrency(2000.4)).toBe('$20.00')
    })
})