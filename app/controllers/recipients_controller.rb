class RecipientsController < ApplicationController
    def index
        user = User.find_by(id: [session:user_id])
        if user
            recipients = user.recipients
            render json: recipients
        else
            render json: { errors: ["Not authorized"]}, status: :unauthorized
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        if user
            recipient = user.recipients.create(recipient_params)
            render json: recipient, status: :created
        else
            render json: { errors: ["Not authorized"]}, status: :unauthorized
        end
    end

    def recipient_params
        params.permit(:name, :likes, :birthday, :user_id)
    end

end
