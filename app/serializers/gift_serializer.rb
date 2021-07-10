class GiftSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :recipient_id

  belongs_to :recipient
end
