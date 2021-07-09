class CreateRecipients < ActiveRecord::Migration[6.1]
  def change
    create_table :recipients do |t|
      t.string :name
      t.string :likes
      t.date :birthday

      t.timestamps
    end
  end
end
