class User::RegistrationsController < DeviseTokenAuth::RegistrationsController
before_filter :configure_sign_up_params, only: [:create]
# before_filter :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    status = 1 #intially set status to OK
    error_messages = [] #List of all errors
    email = params[:email]
    password = params[:password]
    password = params[:password_confirmation]
    school = params[:school]
    name = params[:name]
    nickname = params[:nickname]

    if email.nil? || email.length==0
      status = -1
      error_messages << 'Please enter an email'
    end
    if school.nil?
      status = -1
      error_messages << 'Please enter a school'
    end

    if name.nil?
      status = -1
      error_messages << 'Please enter name'
    end

    if nickname.nil?
      status = -1
      error_messages << 'Please enter a nickname'
    end


    if status == -1
      render json: {'status'=>-1, 'errors'=>error_messages}
    else
      super
    end



  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.for(:sign_up) << :school << :nickname << :name
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.for(:account_update) << :attribute
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
