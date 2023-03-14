
Data Hierarchy

  Account
    L State
      => is a user online or offline, who can talk or call to him?
      => is the user is call in progress?
    L Profile
      L profile img,
      L the self-introducing
      L ...

    L Relation ( like friend, same group, known or unknown)
    L Group 
      L Subgroup
        L Subgroup
    L Router ( for broadcast )

  Group
    => public or private?
    => role?
    => is Unique?
    L Subgroup
      => public or private?
      L Subgroup
      L DM is kinda of New Group.
        So, when first, it's a private, and the creater can invite or authorize the participants to invite
      L Call
        => if someone enter the room, and if call in progress, notify him. If he participate
        exchange sdp

  Data
    L Chat
    L MetaData ( Invitation, Missed Calls... And likewize )
    L Files
      L img, textfile,

Broadcasting

  Websockets
    L Meta info ( like notification, status, call, mention ... )
      L target by User, Group, Subgroup ...
    L Chat, DM, Call ...
      L By Group, Subgroup, One to One,

Api
  Group
  L Invitation
  L CRUD of Group
  Account
  L Auth
  L CRUD of Relation
  L CRUD of State
  Chat...
