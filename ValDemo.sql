USE [master]
GO

if exists (select * from sysdatabases where name='ValDemo')
		drop database ValDemo
go

CREATE DATABASE [ValDemo]
GO

USE [ValDemo]
GO

/****** Object:  Table [dbo].[User]    Script Date: 9/21/2013 11:06:33 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[User](
	[Id] [int] IDENTITY(2,1) NOT NULL,
	[UserKey] [uniqueidentifier] NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Created] [datetime] NULL,
	[Phone] [nvarchar](50) NULL,
	[Email] [nvarchar](100) NULL,
	[CreditCard] [nvarchar](20) NULL,
	[WebSite] [nvarchar](500) NULL,
	[Score] [real] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

INSERT INTO [dbo].[User] (UserKey, Name, Created, Phone, Email, CreditCard, WebSite, Score) VALUES ('0264841D-A203-4DAB-AEDA-02EAF572A727', 'Brian Noyes', '9/12/2013', '555-555-5555', 'brian.noyes@solliance.net', '4916066972768630', 'http://www.solliance.net', 87)
GO

INSERT INTO [dbo].[User] (UserKey, Name, Created, Phone, Email, CreditCard, WebSite, Score) VALUES ('437FD822-9952-42C6-896A-3BF696817E31', 'Ward Bell', '9/1/2013', '999-999-9999', 'breeze@ideablade.com', '5586261737657170', 'http://breezejs.com', 99.99)
GO


