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

    def update
        user = User.find_by(id: session[:user_id])
        if user
            recipient = Recipient.find_by(id: gift_params[:recipient_id])
            if recipient
                gift = Gift.find_by(id: gift_params[:id])
                if gift
                    gift.update(gift_params)
                    render json: gift
                else
                    render json: { error: "Gift not found" }, status: :not_found
                end
            else
                render json: { error: "Recipient not found" }, status: :not_found
            end
        else
            render json: { errors: ["Not authorized"]}, status: :unauthorized
        end
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        if user
            recipient = Recipient.find_by(id: gift_params[:recipient_id])
            if recipient
                gift = Gift.find_by(id: gift_params[:id])
                if gift
                    gift.destroy
                    head :no_content
                else
                    render json: { error: "Gift not found" }, status: :not_found
                end
            else
                render json: { error: "Recipient not found" }, status: :not_found
            end
        else
            render json: { errors: ["Not authorized"]}, status: :unauthorized
        end
    end

    private

    def gift_params
        params.permit(:id, :name, :price, :url, :recipient_id)
    end
end
