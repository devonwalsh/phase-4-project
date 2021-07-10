class RecipientsController < ApplicationController
    def index
        user = User.find_by(id: session[:user_id])
        if user
            recipients = user.recipients
            render json: recipients
        else
            render json: { errors: ["Not authorized"]}, status: :unauthorized
        end
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            recipient = Recipient.find_by(id: recipient_params[:id])
            if recipient
                render json: recipient
            else
                render json: { error: "Recipient not found" }, status: :not_found
            end
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

    def update
        user = User.find_by(id: session[:user_id])
        if user
            recipient = Recipient.find_by(id: recipient_params[:id])
            if recipient
                recipient.update(recipient_params)
            else
                render json: { error: "Recipient not found" }, status: :not_found
            end
        else
            render json: { errors: ["Not authorized"]}, status: :unauthorized
        end
    end

    def destroy
    end

    def recipient_params
        params.permit(:id, :name, :likes, :birthday, :user_id)
    end

end
