
var accepts = require('..')
var assert = require('assert')

describe('accepts.encodings()', function () {
  describe('with no arguments', function () {
    describe('when Accept-Encoding is populated', function () {
      it('should return accepted types', function () {
        var req = createRequest('gzip, compress;q=0.2')
        var accept = accepts(req)
        assert.deepEqual(accept.encodings(), ['gzip', 'compress', 'identity'])
        assert.equal(accept.encodings('gzip', 'compress'), 'gzip')
      })
    })

    describe('when Accept-Encoding is not in request', function () {
      it('should return identity', function () {
        var req = createRequest()
        var accept = accepts(req)
        assert.deepEqual(accept.encodings(), ['identity'])
        assert.equal(accept.encodings('gzip', 'deflate', 'identity'), 'identity')
      })

      describe('when identity is not included', function () {
        it('should return false', function () {
          var req = createRequest()
          var accept = accepts(req)
          assert.strictEqual(accept.encodings('gzip', 'deflate'), false)
        })
      })
    })

    describe('when Accept-Encoding is empty', function () {
      it('should return identity', function () {
        var req = createRequest('')
        var accept = accepts(req)
        assert.deepEqual(accept.encodings(), ['identity'])
        assert.equal(accept.encodings('gzip', 'deflate', 'identity'), 'identity')
      })

      describe('when identity is not included', function () {
        it('should return false', function () {
          var req = createRequest('')
          var accept = accepts(req)
          assert.strictEqual(accept.encodings('gzip', 'deflate'), false)
        })
      })
    })
  })

  describe('with multiple arguments', function () {
    it('should return the best fit', function () {
      var req = createRequest('gzip, compress;q=0.2')
      var accept = accepts(req)
      assert.equal(accept.encodings('compress', 'gzip'), 'gzip')
      assert.equal(accept.encodings('gzip', 'compress'), 'gzip')
    })
  })

  describe('with an array', function () {
    it('should return the best fit', function () {
      var req = createRequest('gzip, compress;q=0.2')
      var accept = accepts(req)
      assert.equal(accept.encodings(['compress', 'gzip']), 'gzip')
    })
  })
})

function createRequest (encoding) {
  return {
    headers: {
      'accept-encoding': encoding
    }
  }
}
