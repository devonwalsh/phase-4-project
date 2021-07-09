class CreateGifts < ActiveRecord::Migration[6.1]
  def change
    create_table :gifts do |t|
      t.string :name
      t.float :price
      t.string :url

      t.timestamps
    end
  end
end
