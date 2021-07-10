class RecipientSerializer < ActiveModel::Serializer
  attributes :id, :name, :likes, :birthday, :user_id

  has_many :gifts
end
