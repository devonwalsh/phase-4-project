class AddUserIdToRecipients < ActiveRecord::Migration[6.1]
  def change
    add_column :recipients, :user_id, :integer
  end
end
