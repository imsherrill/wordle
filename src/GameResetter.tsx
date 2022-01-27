type ResetFnType = (arg?: string) => void;

class GameResetter {
  resetFn: ResetFnType | undefined;

  register(resetFn: ResetFnType): void {
    this.resetFn = resetFn;
  }

  call(answerOverride?: string) {
    if (this.resetFn) {
      this.resetFn(answerOverride);
    }
  }
}

export const gameResetter = new GameResetter();
