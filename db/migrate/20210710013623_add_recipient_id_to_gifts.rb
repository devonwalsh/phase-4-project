class AddRecipientIdToGifts < ActiveRecord::Migration[6.1]
  def change
    add_column :gifts, :recipient_id, :integer
  end
end
