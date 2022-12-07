import { bytesToHex, hexToBytes } from '@metamask/utils';

import fixtures from '../../test/fixtures';
import { curve, getPublicKey, isValidPrivateKey } from './secp256k1';

describe('secp256k1', () => {
  describe('curve', () => {
    it('has the curve parameters', () => {
      expect(curve.n).toBe(
        BigInt(
          '115792089237316195423570985008687907852837564279074904382605163141518161494337',
        ),
      );
    });
  });

  describe('isValidPrivateKey', () => {
    it('checks if a private key is valid', () => {
      expect(isValidPrivateKey(hexToBytes('0x0'))).toBe(false);
      expect(
        isValidPrivateKey(hexToBytes(fixtures.bip32[0].keys[0].privateKey)),
      ).toBe(true);
    });
  });

  describe('getPublicKey', () => {
    const { bip32 } = fixtures;

    it.each(bip32)('returns the public key for a private key', ({ keys }) => {
      for (const { privateKey, publicKey } of keys) {
        expect(bytesToHex(getPublicKey(hexToBytes(privateKey)))).toBe(
          publicKey,
        );
      }
    });
  });
});
