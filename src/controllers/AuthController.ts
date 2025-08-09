class AuthController {
  private static __instance: AuthController;
  private _isLoggedIn = false;

  constructor() {
    if (AuthController.__instance) return AuthController.__instance;

    AuthController.__instance = this;
  }

  public isLoggedIn(): boolean {
    console.log(this._isLoggedIn);
    return this._isLoggedIn;
  }

  public setLoginStatus(status: boolean) {
    this._isLoggedIn = status;
  }
}

export default new AuthController();
