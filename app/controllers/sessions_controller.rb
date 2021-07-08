class SessionsController < ApplicationController
    def create #login
        user = User.find_by(name: params[:name])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { error: "Invalid username or password" }, status: :unauthorized
        end
    end

    def destroy #logout
        session.clear
        head :no_content
    end
end
