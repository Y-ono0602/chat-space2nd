# Chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|encrypted_password|string|null: false|
|name|string|null: false, unique: true, index: true|
### Association
- has_many :messages
- has_many :group,  through:  :group_users
- has_many :group_users


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|name|index|unique: true|

### Association
- has_many :users, through: :group_users
- has_many :messages
- has_many :group_users


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|content|string|
|image|string|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user