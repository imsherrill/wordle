type ResetFnType = () => void;

class GameResetter {
  resetFn: ResetFnType | undefined;

  register(resetFn: ResetFnType): void {
    this.resetFn = resetFn;
  }

  call() {
    if (this.resetFn) {
      this.resetFn();
    }
  }
}

export const gameResetter = new GameResetter();
