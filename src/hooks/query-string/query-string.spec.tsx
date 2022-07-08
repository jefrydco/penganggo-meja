import { renderHook, waitFor } from '@/utils/tests/vitest';
import { describe, expect, it } from 'vitest'
import { useQueryString } from './query-string';

describe("Base Hook", () => {
  it("works", () => {
    const { result } = renderHook(() =>
      useQueryString({username: 'jefrydco', name: 'Jefry Dewangga'})
    );
    waitFor(() => {
      expect(result.current).toBe('?username=jefrydco&name=Jefry+Dewangga')
    })
  });
});