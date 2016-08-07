#!perl

use strict;
use warnings;
use IO::Socket;

my $sock = new IO::Socket::INET(
	Listen => 5,
	LocalAddr => 'localhost',
	LocalPort => 12345,
	Proto => 'tcp',
	ReuseAddr => 0
) or die;

sub hoge($$) {
	my ($conn, $token) = @_;

	if ($token eq "spring") {
		print $conn "Akebono\n";
	}
	elsif ($token eq "summer") {
		print $conn "Yoru\n";
	}
	elsif ($token eq "fall") {
		print $conn "Yuugure\n";
	}
	elsif ($token eq "winter") {
		print $conn "Tsutomete\n";
	}
	elsif ($token eq "quit") {
		print $conn "Quit\n";
		return 1;
	}
	elsif ($token eq "\n") {
		# Flush stream by client.
	}
	else {
		print "Unknown\n";
	}
	0;
}

while (my $conn = $sock->accept()) {

	print "Hello\n";
	print $conn "Hello\n";

	my $msg = "";

	while (1) {
		my $m = <$conn> || "";
		if ($m eq "") {
			sleep 1;
			next;
		}
		print "Recv: $m\n";

		$msg .= $m;
		my @tokens = split /\0/, $msg;
		my $isLastTokenValid = $msg =~ /\0$/;
		if ($isLastTokenValid) {
			$msg = "";
		}
		else {
			$msg = pop @tokens;
		}

		my $quit = 0;
		foreach my $token (@tokens) {
			$quit = hoge($conn, $token);
			last if $quit;
		}
		last if $quit;
	}

	print "Close\n";
	$conn->flush();
	$conn->close();
}

close($sock);
