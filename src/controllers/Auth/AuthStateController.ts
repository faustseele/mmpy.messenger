class AuthStateController {
  private static __instance: AuthStateController;
  private _isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  constructor() {
    if (AuthStateController.__instance) return AuthStateController.__instance;

    AuthStateController.__instance = this;
  }

  public isLoggedIn(): boolean {
    // console.log(this._isLoggedIn);
    return this._isLoggedIn;
  }

  public setLoginStatus(status: boolean) {
    this._isLoggedIn = status;
    localStorage.setItem("isLoggedIn", status.toString());
  }
}

export default new AuthStateController();
