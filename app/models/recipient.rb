class Recipient < ApplicationRecord
    has_many :gifts
    belongs_to :user
end
