class GiftsController < ApplicationController
    def index
        user = User.find_by(id: session[:user_id])
        if user
            recipient = Recipient.find_by(id: gift_params[:recipient_id])
            if recipient
                render json: recipient.gifts
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
            recipient = Recipient.find_by(id: gift_params[:recipient_id])
            if recipient
                gift = recipient.gifts.create(gift_params)
                render json: gift
            else
                render json: { error: "Recipient not found" }, status: :not_found
            end
        else
            render json: { errors: ["Not authorized"]}, status: :unauthorized
        end
    end

    private

    def gift_params
        params.permit(:name, :price, :url, :recipient_id)
    end
end
