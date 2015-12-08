/**
 *
 * @author jskonst
 * @name qUserByEMail
 */ 
Select t1.email as email
From users t1
 Where :email = t1.email